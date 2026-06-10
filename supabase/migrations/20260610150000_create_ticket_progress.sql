create table if not exists public.ticket_progress (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	ticket_id text not null,
	status text not null default 'en_progreso' check (status in ('sin_empezar', 'en_progreso', 'resuelto')),
	selected_action_ids text[] not null default '{}',
	notes text not null default '',
	diagnosis text not null default '',
	solution text not null default '',
	user_reply text not null default '',
	decision text not null default 'cerrar' check (decision in ('cerrar', 'escalar')),
	score integer not null default 0 check (score >= 0 and score <= 100),
	feedback text not null default '',
	updated_at timestamptz not null default now(),
	unique (user_id, ticket_id)
);

alter table public.ticket_progress enable row level security;

create policy "ticket_progress_select_own"
	on public.ticket_progress
	for select
	using (auth.uid() = user_id);

create policy "ticket_progress_insert_own"
	on public.ticket_progress
	for insert
	with check (auth.uid() = user_id);

create policy "ticket_progress_update_own"
	on public.ticket_progress
	for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);

create policy "ticket_progress_delete_own"
	on public.ticket_progress
	for delete
	using (auth.uid() = user_id);
