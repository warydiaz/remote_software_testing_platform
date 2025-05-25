# Dockerfile
FROM redis:7.2

# Exponer el puerto de Redis
EXPOSE 6379

# Comando por defecto
CMD [ "redis-server" ]
