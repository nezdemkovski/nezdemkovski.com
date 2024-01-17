create table "public"."portfolio" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "description" text,
    "image" text,
    "status" text,
    "url" text,
    "project_mdx" text,
    "tags" text[]
);


alter table "public"."portfolio" enable row level security;

CREATE UNIQUE INDEX portfolio_pkey ON public.portfolio USING btree (id);

alter table "public"."portfolio" add constraint "portfolio_pkey" PRIMARY KEY using index "portfolio_pkey";

grant delete on table "public"."portfolio" to "anon";

grant insert on table "public"."portfolio" to "anon";

grant references on table "public"."portfolio" to "anon";

grant select on table "public"."portfolio" to "anon";

grant trigger on table "public"."portfolio" to "anon";

grant truncate on table "public"."portfolio" to "anon";

grant update on table "public"."portfolio" to "anon";

grant delete on table "public"."portfolio" to "authenticated";

grant insert on table "public"."portfolio" to "authenticated";

grant references on table "public"."portfolio" to "authenticated";

grant select on table "public"."portfolio" to "authenticated";

grant trigger on table "public"."portfolio" to "authenticated";

grant truncate on table "public"."portfolio" to "authenticated";

grant update on table "public"."portfolio" to "authenticated";

grant delete on table "public"."portfolio" to "service_role";

grant insert on table "public"."portfolio" to "service_role";

grant references on table "public"."portfolio" to "service_role";

grant select on table "public"."portfolio" to "service_role";

grant trigger on table "public"."portfolio" to "service_role";

grant truncate on table "public"."portfolio" to "service_role";

grant update on table "public"."portfolio" to "service_role";

create policy "Enable read access for all users"
on "public"."portfolio"
as permissive
for select
to public
using (true);



