# E-Park
# Sistema de Gestión de Estacionamiento para la Universidad

![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

## Descripción

Este proyecto es un sistema de gestión de estacionamiento diseñado para la universidad, que permite a los usuarios (estudiantes, profesores y personal administrativo) reservar espacios de estacionamiento, gestionar vehículos, y reportar incidencias. Los administradores tienen capacidades adicionales para gestionar usuarios, espacios de estacionamiento y generar reportes.

## Características

- **Gestión de Usuarios**: Registro, actualización y eliminación de usuarios.
- **Gestión de Vehículos**: Registro y gestión de vehículos de los usuarios.
- **Reservas de Estacionamiento**: Creación, actualización y cancelación de reservas de espacios de estacionamiento.
- **Gestión de Espacios de Estacionamiento**: Administración de los espacios de estacionamiento disponibles.
- **Reportes**: Generación de reportes sobre el uso del estacionamiento.
- **Incidencias**: Reporte y gestión de problemas relacionados con el estacionamiento.

## Tecnologías Utilizadas

- **Frontend**: React, JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Control de Versiones**: Git, GitHub

## Instalación

### Prerrequisitos

- Node.js
- MongoDB

### Pasos

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Not-Minimal/Epark
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd Epark
    ```

3. Instala las dependencias del servidor:

    ```bash
    cd backend
    npm install
    ```

4. Configura las variables de entorno en un archivo `.env` en el directorio `backend/src/config`:

    ```bash
    PORT=3000
    HOST=localhost
    DB_URL=tu_conexion_a_mongodb
    PASS_SECRET=tu_secreto_para_jwt
    ```

5. Inicia el servidor:

    ```bash
    npm run dev
    ```

6. Navega al directorio del cliente:

    ```bash
    cd ../frontend
    ```

7. Instala las dependencias del cliente:

    ```bash
    npm install
    ```

8. Inicia la aplicación del cliente:

    ```bash
    npm run dev
    ```

## Uso

### Roles y Funcionalidades

- **Administrador**:
  - Gestión de usuarios, vehículos, reservas, espacios de estacionamiento e incidencias.
  - Generación de reportes.

- **Usuario**:
  - Registro y gestión de vehículos.
  - Creación, actualización y cancelación de reservas de estacionamiento.
  - Reporte de incidencias.

### Navegación

1. **Página de Inicio**: Presentación y acceso rápido a las funciones principales.
2. **Perfil de Usuario**: Gestión de la información del usuario y sus vehículos.
3. **Reservas de Estacionamiento**: Ver disponibilidad y gestionar reservas.
4. **Gestión de Incidencias**: Reportar y ver el estado de incidencias.

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (feature/nueva-funcionalidad).
3. Realiza los cambios y haz commit.
4. Envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contactos

### 1 Colaborador
- **Autor**: Saul Muñoz Pedreros
- **Email**: nottminimal@gmail.com
- **LinkedIn**: [NotMinimal](https://www.linkedin.com/in/notminimal/)

### 2 Colaborador
- **Autor**: Matias Arenas
- **Email**: matias.arenas2201@alumnos.ubiobio.cl
### 3 Colaborador
- **Autor**: Tomas Mendez
- **Email**: tomas.mendez2201@alumnos.ubiobio.cl
### 4 Colaborador
- **Autor**: Nicolas Muñoz
- **Email**: nicolas.munoz2201@alumnos.ubiobio.cl
### 5 Colaborador
- **Autor**: Francisca Huaique
- **Email**: francisca.huaique2201@alumnos.ubiobio.cl
### 6 Colaborador
- **Autor**: Deivid Sandoval
- **Email**: deivid.sandoval2201@alumnos.ubiobio.cl
