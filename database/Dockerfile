FROM openjdk:8 as generate-env
ARG pc=1000

# Generate dataset using the BSBMtools
COPY datasetgen /usr/tools
WORKDIR /usr/tools
RUN ./generate -pc ${pc} -s sql

FROM mysql:8

# Create database
ENV MYSQL_DATABASE benchmark

# Move the sql files so they are executed during
# container startup
COPY --from=generate-env /usr/tools/dataset/ /docker-entrypoint-initdb.d/
COPY --from=generate-env /usr/tools/td_data /usr/td_data