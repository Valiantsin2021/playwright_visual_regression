ARG PW_VERSION=next
FROM mcr.microsoft.com/playwright:$PW_VERSION-jammy
LABEL version=$PW_VERSION
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npx playwright install
RUN  adduser testrunner && usermod -aG sudo testrunner
RUN chown  -R testrunner:testrunner /app
USER testrunner
CMD ["npm", "t"]