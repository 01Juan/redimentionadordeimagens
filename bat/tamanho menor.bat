@echo off
set arg1=%1
set arg2=%arg1:~0,-5%
ffmpeg -y -i %arg1% -vf fps=10,scale=-1:-1:flags=lanczos,palettegen %TEMP%\palette.png
ffmpeg -i %arg1% -i %TEMP%\palette.png -filter_complex "scale=-1:-1:flags=lanczos[x];[x][1:v]paletteuse" %arg2%-.png
::ffmpeg -i %arg1% -i %TEMP%\palette.png -filter_complex "fps=120,scale=-1:-1:flags=lanczos[x];[x][1:v]paletteuse" %arg2%3.png
ffmpeg.exe -f lavfi -i color=c=#00000000 -i %arg1% -c: png -filter_complex "[1:v]chromakey=0x47A88C:similarity=.02[out]" -map "[out]" -y %arg2%...png
ffmpeg.exe -i %arg1% -f image2 -vcodec mjpeg -y %arg2%_.png
del /f %TEMP%\palette.png