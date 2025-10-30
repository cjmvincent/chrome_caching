# Nginx Google Content Caching

On premises caching for Google products.

## Overview

This is an on premise caching solution currently deployed in a k12 education setting to mitigate ChromeOS related WAN bottlenecking. The caching server downloads large files in 16MB slices. Cache locking has been enabled to prevent the client from pulling a file at the same time as a caching operation, thus reducing bandwidth utilization; meaning only one instance of each file should ever downloaded reducing unneccesary cluter.

## Intercepted Zones

Google Chrome/ChromeOS Zones:

       dl.google.com
       *.gvt1.com

## Implementation Method 1 (PAC file)

This method is for sites that want to take advantage of using a .pac file to manipulate Chrome traffic opposed to hardcoding DNS entries into their enviroment.

1. Create a linux VM (Ubuntu was used for this case), in this scenario the host was created with 4 CPUs, 8GB RAM, and 200GB disk space; serving ~11,000 ChromeOS devices.
2. Clone this repository; Execute `setup.sh` file on the new server as root. This will install all necessary packages for the nginx instance as well as moves the .conf file into it's necessary directory.
3. Host the provided .pac file that Chrome devices will use to proxy their traffic so requested content can be cached; BE SURE TO UPDATE THE FILE TO REFLECT THE IP OF YOUR SERVER! The provided nging config hast the file hosted in `/var/www/html/`; should you decide to use your own file make certain to reflect the .pac file's name correctly in the nginx config.

## Implementation Method 2 (Local DNS Option)

This method is for those that do not want to use the .pac file method, and instead want to hardcode DNS entries to steer the intended Chrome traffic.

1. Create a linux VM (Ubuntu was used for this case), in this scenario a host was created with 4 CPUs, 8GB RAM, and 200GB disk space.
2. Clone this repository; Execute `setup.sh` file on the new server as root. This will install all necessary packages for the nginx instance.
3. On your local DNS server, install the zones listed in the "Intercepted Zones" section above with both base and wildcard A records pointing to the IP address you gave your caching server. A powershell script has been included that you can run on a Microsoft DNS Server to configure the DNS entries automatically.

## Warning: The included nginx.conf file has only been tested on Ubuntu 24.03.
