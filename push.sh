# push to vps
rsync -av --delete --exclude '.git' ./.vitepress/dist/  rbook:~/www/blog

cd ./.vitepress/dist
/usr/bin/rm -rf .git
git init
git remote add origin git@github.com:Rainboylvx/blogData.git
git add .
git commit -m "gitpage"
git push origin master:gh-pages -f
