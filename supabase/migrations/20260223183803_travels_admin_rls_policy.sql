create policy "Enable all operations for ADMIN users only"
  on travels for all using (is_admin());;
