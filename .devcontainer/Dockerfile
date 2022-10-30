FROM mcr.microsoft.com/devcontainers/typescript-node:18-buster

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    libxshmfence1 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libgtk-3-0 libgbm1 libasound2 dpkg fakeroot mono-devel wine64 \
    && dpkg --add-architecture i386 && apt-get update && apt-get -y install wine32