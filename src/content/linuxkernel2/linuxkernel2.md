---
layout: post
title: "2강 - 커널 개발 환경 구축"
author: youjin
tags: ["linuxkernel"]
image: ../img/linuxpenguin2.png
date: "2020-04-01T18:06:00Z"
draft: false
---

# 2강 - 커널 개발 환경 구축

- 라즈베리파이 설치 준비
    - 라즈비안 다운로드
    - windows에서 sd카드에 이미지를 쓸 프로그램 - win32diskimager ( 굽는다=>0번째부터 데이터 작성)
        - sd카드에 라즈비안 운영체제가 깔리게 된다
    - USB to TTL (GPIO 핀)
        - lms 드라이버 필요(윈도우 버전별 상이)
    - Putty 실행(장치관리자 포트 확인 후)
        - connection type:serial
        - serial line: com3
        - speed: 115200
        - session name
        - open
    - 설정이 끝나고 터미널이 뜨면 엔터를 눌러주어 통신을 시작한다
- 라즈베리파이 초기 수행
    - 패키지 업데이트
- 커널 개발환경 구축
    - kernel 다운로드- `git clone -depth 1 https://github.com/raspberrypi/linux`
    - 패키지 추가 - `sudo apt-get install bc`
    - kernel build configuration (raspberry pi 2)
        - cd linux
        - KERNEL-kernel7
        - make bcm2709 defconfig
    - kernel and module compile
        - ![lecture2-1](https://drive.google.com/uc?id=1OQ1WRWY-Kti38EWuhSNC_5bXZdYF99Az)
- 커널 컴파일 완료, 셧다운 후 재부팅하면 작동
- Test용 device driver 작성
    - 작성할 파일
        - Source code: rako.c
        - Project file: Makefile
    - 컴파일 후 결과물
        - niko.ko
    - Device driver 관련 명령어
        - lsmod, insmod, rmmod
    - 출력 메시지 확인
        - demsg (디바이스/ 커널이 출력하는 내용 확인, 원래는 나오지 않음)
    - ![lecture2-2](https://drive.google.com/uc?id=1ts_cYX68LdRcLxEeHCjQVYgJu3hMhwyr)
        - 커널에 들어가자 마자 바로 실행되는 ofd_init 함수
            - 모듈이 디바이스에 들어가자 마자 실행
        - 안에서 데이터 받으며 수행한 malloc받은 파일들을 놓아주는 ofd_exit 함수 수행
        - printk|printf
        - 커널에서 사용 가능(커널에서는 시스템콜이 불가능하다)printk(X)하면 X가 커널의 buffer에 저장된다(rako~~라는 문자열로 저장, exit때도) | 커널에서 사용 불가 (시스템콜)
- ![lecture2-3](https://drive.google.com/uc?id=1l7-sPqL59OEalKvG1q1ph7gd5sOV4um_)
    - insmod - 커널 안으로 들어가게 된다 (화면에는 아무것도 뜨지x)
        - 커널에 미치는 명령어기때문에 sudo를 써줘야 한다
    - lsmod - rako라는 모듈만 들어갔다는 것을 확인할 수 있음
- ![lecture2-4](https://drive.google.com/uc?id=1PnQO3zQ2wKTDQkOHnLyH1MzOp6KGP9Ws)
    - rmmod - 커널 안에 있는 모듈을 끄집어 낸다
    - dmesg - 커널 버퍼에 저장되어 있는 문자열을 출력해주는 역할
        - 시간, 문자 (시간이 중요하다 - 프로세스가 어떤 형태로 수행되는지 알 수 있게 해준다 => 디버깅에 도움이 된다)
- ![lecture2-5](https://drive.google.com/uc?id=14-4YKajMFMzWTt0hP6RdAWgHTlnN9kwm)
