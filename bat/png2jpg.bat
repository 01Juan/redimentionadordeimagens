@echo off
set arg1=%1
set arg2=%arg1:~0,-5%

ffmpeg -i %arg1% %arg2%-.jpg
