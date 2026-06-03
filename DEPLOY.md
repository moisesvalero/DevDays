# Despliegue de DevDays en Vercel

Pasos en orden. Si saltas alguno, te toca volver.

## 1. Antes de subir nada

```bash
npm run check
npm run build
```

Si ambos pasan, sigue. Si no, arregla antes.

## 2. Subir el repo a GitHub

```bash
git add -A
git commit -m "ready for deploy"
git push
```

(Tener el repo en GitHub te permite deployments automáticos en cada push.)

## 3. Crear el proyecto en Vercel

1. https://vercel.com/new → importar el repo de GitHub.
2. **Framework Preset**: SvelteKit (Vercel lo detecta solo gracias a `@sveltejs/adapter-vercel`).
3. **Root Directory**: dejar la raíz.
4. **Build Command / Output**: dejar los defaults (ya cubiertos en `vercel.json`).
5. **NO pulsar Deploy todavía**. Antes, configurar las env vars del paso 4.

## 4. Env vars en Vercel (Project Settings → Environment Variables)

Marcar las tres environments (Production, Preview, Development) en cada una:

| Variable                   | Valor                                             | Tipo              |
| -------------------------- | ------------------------------------------------- | ----------------- |
| `PUBLIC_SUPABASE_URL`      | `https://xxxx.supabase.co`                        | public            |
| `PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_...`                              | public            |
| `OPENAI_API_KEY`           | `sk-proj-...`                                     | secret (primario) |
| `GEMINI_API_KEY`           | `AIzaSy...`                                       | secret (fallback) |
| `ALLOWED_EMAILS`           | `tu@email.com` (separados por coma si son varios) | secret            |

> El tutor IA usa **OpenAI como primario y Gemini como fallback automático**.
> Con solo una de las dos la app sigue funcionando, pero pierdes la red de seguridad.

> No necesitas `PUBLIC_SITE_URL`: el Magic Link usa el host del propio request
> (`url.origin`), así que funciona en `localhost`, en preview deploys de Vercel
> y en producción sin tocar nada.
>
> Si `ALLOWED_EMAILS` queda vacío, **nadie** podrá entrar (modo paranoia activado).

## 5. Configurar Supabase para producción

1. https://app.supabase.com → tu proyecto → **Authentication → URL Configuration**.
2. En **Site URL** pon `https://TU-DOMINIO.vercel.app`.
3. En **Redirect URLs** añade (sin quitar el de localhost):
   ```
   https://TU-DOMINIO.vercel.app/auth/callback
   ```
4. Opcional pero recomendado: **Authentication → Providers → Email** → desactiva "Enable new user signups" una vez te hayas logueado por primera vez en producción con tu email. Con esto + la whitelist tienes doble candado.

## 6. Deploy

En Vercel, pulsar **Deploy**. Esperar ~1-2 min.

## 7. Smoke test en producción

1. Ir a `https://TU-DOMINIO.vercel.app` → debe redirigir a `/estudio` → como no hay sesión, salta a `/login`.
2. Probar con un email **fuera** de `ALLOWED_EMAILS` → debe salir "Este email no tiene acceso a la app".
3. Probar con tu email → te llega el Magic Link → click → entra a `/estudio`.
4. Corregir un ejercicio sencillo del Día 1 → la IA responde.
5. Marcar día completado → refresca → sigue en verde (persistencia OK).

## 8. Si algo falla

| Síntoma                                                               | Causa probable                                                                                          |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| El Magic Link redirige a localhost                                    | Faltó añadir la URL de Vercel en Supabase Redirect URLs (paso 5).                                       |
| "Este email no tiene acceso" con tu propio email                      | `ALLOWED_EMAILS` mal escrito en Vercel (espacios, mayúsculas raras). El guard normaliza, pero revisa.   |
| 500 al pulsar Corregir                                                | Faltan **ambas** keys (`OPENAI_API_KEY` y `GEMINI_API_KEY`) en Vercel. Con una basta para que funcione. |
| "La IA está saturada" pese a tener key                                | OpenAI tiró 5xx **y** Gemini también. Pasa rara vez; reintenta en 10-20 s.                              |
| El usuario logueado tras deploy entra al panel pero no carga progreso | Tabla `progreso` o las policies RLS no se ejecutaron. Volver a pegar el SQL del `plan.md`.              |

## 9. Después del primer deploy

Cada vez que hagas `git push`, Vercel deploya automáticamente. Las env vars persisten.

Si quieres dar acceso a otra persona: edita `ALLOWED_EMAILS` en Vercel y haz redeploy (Vercel tiene botón "Redeploy" sin recompilar).
