# 使用官方 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 将 dist 目录下的文件复制到容器中的 /usr/share/nginx/html 目录下
COPY dist/ /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# 使用 Nginx 运行 Vue 应用
CMD ["nginx", "-g", "daemon off;"]