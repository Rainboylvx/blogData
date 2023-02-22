rsync -avzP --delete \
    --exclude '.git' \
    --exclude 'node_modules/' \
    . openwrt_home:/mnt/sda4/myweb/blog/
