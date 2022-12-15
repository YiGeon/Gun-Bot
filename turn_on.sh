#!/bin/bash
export BUILD_ID=dontKillMe
cd /home/ubuntu/Gun-Bot
nohup node . > /dev/null 2>&1 &
