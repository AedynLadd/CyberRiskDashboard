Here we can add any code that needs to be available to the entire application. The core module should be injected only once in the app module and a module import guard should be added to avoid duplicate injection. The core module can include exception handler service, logging service, HTTP and logging interceptors, application level services, utility classes etc.