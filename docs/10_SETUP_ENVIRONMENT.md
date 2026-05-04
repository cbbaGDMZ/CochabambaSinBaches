# 10 — Setup Environment: Cochabamba Sin Baches

> **Documento ejecutable.** Contiene los pasos exactos para configurar el entorno de desarrollo desde cero en macOS. La IA o el desarrollador debe ejecutar estos comandos en orden, sin saltarse ningún paso. Al finalizar, la máquina estará lista para crear el proyecto Expo.

---

## Requisitos previos

- macOS (cualquier versión reciente)
- Acceso a Terminal
- Conexión a internet
- Cuenta de GitHub ya creada y configurada con Git

---

## Paso 1: Verificar Git

Git ya está instalado y configurado. Verificar que funciona:

```bash
git --version
```

**Resultado esperado:** `git version 2.x.x` (cualquier versión 2.x está bien).

Si no aparece, instalar con:
```bash
xcode-select --install
```

Verificar configuración:
```bash
git config --global user.name
git config --global user.email
```

**Resultado esperado:** Tu nombre y email de GitHub. Si están vacíos, configurar:
```bash
git config --global user.name "Gaston Mancilla"
git config --global user.email "tu-email@ejemplo.com"
```

---

## Paso 2: Instalar Homebrew (si no lo tienes)

Homebrew es el gestor de paquetes de macOS. Verificar si ya está instalado:

```bash
brew --version
```

**Si NO está instalado**, ejecutar:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Después de instalar, seguir las instrucciones que aparecen en pantalla para agregar Homebrew al PATH. Generalmente es algo como:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Verificar:
```bash
brew --version
```

**Resultado esperado:** `Homebrew 4.x.x`

---

## Paso 3: Instalar Node.js con nvm

NO instalar Node.js directamente con Homebrew ni desde la web. Usar **nvm** (Node Version Manager) para poder gestionar versiones.

### 3.1 Instalar nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Cerrar y reabrir la Terminal, luego verificar:
```bash
nvm --version
```

**Resultado esperado:** `0.40.1` (o similar).

Si `nvm` no se reconoce después de reabrir Terminal, agregar manualmente al shell:
```bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
source ~/.zshrc
```

### 3.2 Instalar Node.js LTS

```bash
nvm install --lts
nvm use --lts
nvm alias default lts/*
```

Verificar:
```bash
node --version
npm --version
```

**Resultado esperado:**
- Node: `v22.x.x` o `v20.x.x` (cualquier LTS reciente está bien)
- npm: `10.x.x`

---

## Paso 4: Instalar Watchman

Watchman mejora el rendimiento del file watching en React Native. Es opcional pero muy recomendado en macOS:

```bash
brew install watchman
```

Verificar:
```bash
watchman --version
```

**Resultado esperado:** `2024.x.x.x` o similar.

---

## Paso 5: Instalar Expo CLI

Expo CLI ya no se instala globalmente como antes. Se usa `npx` directamente. Pero necesitamos instalar `eas-cli` globalmente para builds futuros:

```bash
npm install -g eas-cli
```

Verificar que Expo funciona vía npx:
```bash
npx expo --version
```

**Resultado esperado:** `0.22.x` o similar. La primera vez puede pedir instalar el paquete, responder `y`.

Verificar EAS CLI:
```bash
eas --version
```

**Resultado esperado:** `13.x.x` o similar.

---

## Paso 6: Crear cuenta de Expo (si no tienes)

La cuenta de Expo es necesaria para push notifications y builds.

### 6.1 Crear cuenta

Ir a **https://expo.dev/signup** y crear una cuenta. Recordar el username y password.

### 6.2 Login desde la terminal

```bash
npx expo login
```

Ingresa tu username y password cuando lo pida.

Verificar:
```bash
npx expo whoami
```

**Resultado esperado:** Tu username de Expo.

---

## Paso 7: Instalar Expo Go en tu teléfono Android

1. Abrir **Google Play Store** en tu teléfono Android.
2. Buscar **"Expo Go"**.
3. Instalar la app de **Expo** (logo morado).
4. Abrir Expo Go y hacer login con la misma cuenta del Paso 6.

**Importante:** Tu teléfono y tu computadora deben estar en la **misma red WiFi** para que Expo Go se conecte al servidor de desarrollo.

---

## Paso 8: Instalar VS Code (editor de código)

Si no tienes un editor instalado:

```bash
brew install --cask visual-studio-code
```

### 8.1 Extensiones recomendadas (instalar desde VS Code)

Abrir VS Code y instalar estas extensiones (Cmd+Shift+X para buscar):

| Extensión | ID | Propósito |
|---|---|---|
| **ESLint** | `dbaeumer.vscode-eslint` | Linting automático |
| **Prettier** | `esbenp.prettier-vscode` | Formateo automático |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Autocompletado de clases |
| **ES7+ React/Redux/React-Native** | `dsznajder.es7-react-js-snippets` | Snippets de React |
| **GitLens** | `eamodio.gitlens` | Historial de Git mejorado |
| **Error Lens** | `usernamehw.errorlens` | Errores inline visibles |
| **Material Icon Theme** | `pkief.material-icon-theme` | Íconos bonitos para archivos |

### 8.2 Configuración de VS Code

Crear archivo de configuración del workspace. Esto se hará en el paso de inicialización del proyecto (`11_PROJECT_INITIALIZATION.md`), donde se creará `.vscode/settings.json` dentro del proyecto.

---

## Paso 9: Verificación final

Ejecutar TODOS estos comandos y verificar que ninguno da error:

```bash
echo "=== Git ==="
git --version

echo "=== Node ==="
node --version

echo "=== npm ==="
npm --version

echo "=== nvm ==="
nvm --version

echo "=== Expo ==="
npx expo --version

echo "=== EAS CLI ==="
eas --version

echo "=== Expo Login ==="
npx expo whoami

echo "=== Watchman ==="
watchman --version
```

**Resultado esperado:** Todos muestran una versión, ninguno dice "command not found" o da error.

---

## Paso 10: Preparar el repositorio

El repositorio ya existe y tiene esta estructura:

```
cochabamba-sin-baches/
├── docs/
│   ├── 00_PROJECT_BRIEF.md
│   ├── 01_TECH_STACK.md
│   ├── 02_DESIGN_SYSTEM.md
│   └── 03_CODING_STANDARDS.md
├── README.md
└── .gitignore
```

Verificar que el `.gitignore` del repo incluya al menos estas líneas (si no las tiene, agregarlas):

```gitignore
# Dependencies
node_modules/

# Expo
.expo/
dist/
web-build/

# Environment variables
.env
.env.local
.env.*.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# Build
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*

# Metro
.metro-health-check*

# Testing
coverage/

# Misc
*.log
npm-debug.log*
```

Si se modificó el `.gitignore`, hacer commit:
```bash
git add .gitignore
git commit -m "chore: update gitignore for expo project"
git push
```

---

## Resumen de lo instalado

| Herramienta | Propósito | Cómo se instaló |
|---|---|---|
| Git | Control de versiones | Pre-instalado / xcode-select |
| Homebrew | Gestor de paquetes macOS | Script oficial |
| nvm | Gestor de versiones de Node | Script oficial |
| Node.js LTS | Runtime JavaScript | nvm |
| npm | Gestor de paquetes JS | Viene con Node |
| Watchman | File watcher optimizado | Homebrew |
| Expo CLI | CLI de Expo (via npx) | npx (no se instala globalmente) |
| EAS CLI | Build y deploy de Expo | npm global |
| Expo Go (Android) | App para testear en el teléfono | Google Play Store |
| VS Code | Editor de código | Homebrew cask |

---

## Qué NO se instaló todavía (y por qué)

| Herramienta | Cuándo se instala | Por qué no ahora |
|---|---|---|
| Android Studio | No se necesita para Expo Go | Solo se necesita para Dev Client o builds locales |
| Xcode | Fuera del alcance | Solo iOS, no es alcance de esta fase |
| Docker | Cuando se haga el backend | No es necesario para la app móvil |
| Python | Cuando se haga el backend | No es necesario para la app móvil |
| PostgreSQL | Cuando se haga el backend | No es necesario para la app móvil |
| Firebase CLI | Cuando se configuren push notifications | Se hace más adelante |

---

## Troubleshooting

### "command not found: nvm" después de instalar
```bash
source ~/.zshrc
```
Si sigue sin funcionar, verificar que el archivo `~/.zshrc` contiene las líneas de nvm del Paso 3.

### "command not found: brew" en Mac con chip Apple Silicon (M1/M2/M3)
Homebrew se instala en `/opt/homebrew/` en Apple Silicon. Asegurarse de que el PATH esté configurado:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
source ~/.zprofile
```

### Expo Go no se conecta al servidor de desarrollo
1. Verificar que el teléfono y la computadora estén en la **misma red WiFi**.
2. Si estás en una red corporativa o universitaria, puede bloquear la conexión. Usar una red doméstica o hotspot.
3. Como alternativa, usar modo tunnel: `npx expo start --tunnel` (requiere instalar `@expo/ngrok`).

### npm da errores de permisos
NUNCA usar `sudo npm install`. Si hay errores de permisos, es porque Node no se instaló con nvm. Verificar:
```bash
which node
```
Debe mostrar una ruta que incluya `.nvm`, como `/Users/tu-usuario/.nvm/versions/node/v22.x.x/bin/node`. Si muestra `/usr/local/bin/node`, desinstalar ese Node y usar el de nvm.

---

## Siguiente paso

Una vez completado este documento, proceder a `11_PROJECT_INITIALIZATION.md` para crear el proyecto Expo y configurar todas las dependencias.

---

**Versión:** 1.0
**Fecha:** Mayo 2026
**Estado:** Listo para ejecución
