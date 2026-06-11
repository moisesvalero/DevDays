create table if not exists public.terminal_progress (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	lesson_id text not null,
	status text not null default 'en_progreso' check (status in ('sin_empezar', 'en_progreso', 'resuelto')),
	cwd text not null default '/home/moises',
	history jsonb not null default '[]'::jsonb,
	completed_exercise_ids text[] not null default '{}',
	score integer not null default 0 check (score >= 0 and score <= 100),
	updated_at timestamptz not null default now(),
	unique (user_id, lesson_id)
);

alter table public.terminal_progress enable row level security;

create policy "terminal_progress_select_own"
	on public.terminal_progress
	for select
	using (auth.uid() = user_id);

create policy "terminal_progress_insert_own"
	on public.terminal_progress
	for insert
	with check (auth.uid() = user_id);

create policy "terminal_progress_update_own"
	on public.terminal_progress
	for update
	using (auth.uid() = user_id)
	with check (auth.uid() = user_id);

create policy "terminal_progress_delete_own"
	on public.terminal_progress
	for delete
	using (auth.uid() = user_id);
