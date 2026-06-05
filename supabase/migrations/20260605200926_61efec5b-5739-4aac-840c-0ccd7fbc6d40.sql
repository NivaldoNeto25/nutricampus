
DO $$ BEGIN
  CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.nutritionists_profiles
  ADD COLUMN IF NOT EXISTS crn TEXT,
  ADD COLUMN IF NOT EXISTS crn_uf TEXT,
  ADD COLUMN IF NOT EXISTS verification_status public.verification_status NOT NULL DEFAULT 'pending';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _role public.app_role;
  _name TEXT;
  _crn TEXT;
  _crn_uf TEXT;
BEGIN
  _name := COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1));
  _role := COALESCE((NEW.raw_user_meta_data ->> 'role')::public.app_role, 'user');
  _crn := NEW.raw_user_meta_data ->> 'crn';
  _crn_uf := NEW.raw_user_meta_data ->> 'crn_uf';

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role)
    ON CONFLICT DO NOTHING;

  IF _role = 'nutritionist' THEN
    INSERT INTO public.nutritionists_profiles (user_id, name, email, crn, crn_uf, verification_status)
      VALUES (NEW.id, _name, NEW.email, _crn, _crn_uf, 'pending')
      ON CONFLICT (user_id) DO NOTHING;
  ELSIF _role = 'user' THEN
    INSERT INTO public.profiles (user_id, name, email)
      VALUES (NEW.id, _name, NEW.email)
      ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;
