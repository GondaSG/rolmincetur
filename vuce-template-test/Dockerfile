FROM openjdk:8
VOLUME /TEMP
EXPOSE 8080
COPY build/libs/vuce-template-test-0.0.1-SNAPSHOT.jar message-server-1.0.0.jar
ENTRYPOINT ["java","-jar","/app.jar"]