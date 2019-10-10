# Docker Proxy

## 概要

ローカルサーバーで起動しているDockerのコンテナにアクセスを振り分けるプロキシです。

http://nip.io/

このDNSサービスの利用を想定ます。

例えば`10.0.0.2`のローカルサーバーで`container_name`という名前で`4000 -> 80`のポートをマッピングしたWEBサーバーが起動しているとします。

`10.0.0.2`でdocker_proxyサーバーを起動し

http://container_name.10.0.0.2.nip.io/

へアクセスすると`http://127.0.0.1:4000`にアクセスが転送され`container_name`のサイトが表示されます。


`http://10.0.0.2.nip.io`では起動しているコンテナのリストも参照可能です。



## 起動コマンド

```
pm2 start --name DockerProxy  /home/source/docker-proxy/proxy/app.js
pm2 start --name DockerIndex  /home/source/docker-proxy/index/app.js
```

DockerIndexの方は80で待ち受けるのでrootじゃないと出来ないようです。DockerProxyの方は8080なのでrootじゃなくてもOKです。