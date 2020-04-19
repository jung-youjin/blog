---
layout: post
title: "1강 - 어플리케이션 계층 - 네트워크 어플리케이션의 원리"
author: youjin
tags: ["network"]
image: ../img/network.png
date: "2020-04-13T23:56:00Z"
draft: false
---

2020.04.13 1강) 2. 어플리케이션 계층 - 네트워크 어플리케이션의 원리

<br><br>
Chapter 2: outline

2.1 principles of network applications

- app architectures
- app requirements

---

<br>
- Creating a network app
    - 우리와 가장 가까이 있는 어플리케이션 계층 (TCP/IP 4 Layer - Application // Transport // Internet // Network Access)
    - write programs that
        - run on different end systems
        - communicate over network
        - ex) web server sw communicates with browser sw
        - 프로세스 대 프로세스
    - no need to write sw for network-core devices
- Client-server architecture
    - 클라이언트 client
        - 필요할 때만 액션을 취하는 역할
        - communicate with server
        - may be intermittently connected
        - may have dynamic IP addresses
        - do not communicate directly with each other
    - 서버 server
        - 24시간 내내 같은 장소에서 기다린다
        - always on host
        - permanent IP address
        - data centers for scaling
- Processes communicating
    - 프로그램을 실행시키면 그것이 프로세스
    - 프로세스 간의 커뮤니케이션
    - socket이라고 불리는 OS의 인터페이스
        - 네트워크 관련해 구성된 API가 소켓이다
        - 소켓 또한 운영체제가 제공하는 시스템콜 중의 일부이다
    - 프로세스의 주소가 중요하다 = 해당하는 소켓의 인터페이스의 주소
        - 어떻게 addressing하느냐?
            - ip 주소를 통해 프로세스가 동작하는 머신을 지칭하나
            - ip 주소만으로는 부족한 이유는 그 속에 수많은 프로세스가 있기 때문에
                - 몇호실에 해당되는 것이 put번호
                - ex) 건물내에 호실 번호가 나누어져 있는 것처럼!
            - 서버 주소는 고정되어 있어야 클라이언트가 찾아갈 수 있다
                - ip 번호와 포트번호가 있어야 찾아갈 수 있다
                - 웹 서버, 브라우저 포트는 80으로 고정되어 있다고 한다
                - ex) naver.com를 치면 ip주소:80으로 변환된다
            - 결론 : ip주소와 socket(포트 번호)을 통해 addressing한다!
    - process - program running within a host
        - within same host, two processes communicate using inter-process communication(defined by OS)
        - processes in different hosts communicate by exchanging messages
    - clients, servers
        - client process - process that initiates communication
        - server process - process that waits to be contacted
    - aside - applications with P2P architectures have client process & server processes
- Addressing processes
    - to receive messages, processes must have identifier
    - host device has unique 32bit IP-address
    - identifier includes both IP address and port numbers associated with process on host
        - port number examples) HTTP server: 80, mail server: 25
    - to send HTTP message to edu web server
        - IP address: 128.119.245.12
        - port number: 80
    - Q) does IP address of host on which process runs suffice(충분하다) for identifying the process?
        - A) any processes can be running on same host
- What transport service does an app need?
    - data integrity
    - timing
    - throughput
    - security
    - transport 계층에서 원하는 기능들
- Internet transport protocols services
    - TCP service
        - reliable transport between sending and receiving process
            - 말한 그대로 유실 없이 간다는 것
        - flow control
            - sender won't overwhelm receiver
        - congestion control
            - throttle sender when network overloaded
        - does not provide
            - timing, minimum throughput guarantee, security
        - connection-oriented
            - setup required between client and server processes
    - UDP service
        - unreliable data transfer between sending and receiving process
        - does not provide
            - reliability, flow control, congestion control, timing, throughput guarantee, security, or connection setup
        - Q) why bother? why is there a UDP?
    - TCP/UDP 선정 기준 - 신뢰도 유무
- Internet apps: application, transport protocols <br>

   application | application layer protocol | underlying transport protocol
   --- | --- | ---
   email | SMTP [RFC 2821] | TCP
   remote terminal access | Telnet | TCP
   web | HTTP [4FC2616] | TCP
   file transfer | FTP [RFC 959] | TCP
   streaming multimedia | HTTP, RTP | TCP or UDP
   internet telephony | SIP, TRYP, proprietary | TCP or UDP



2.2 Web and HTTP

- Web and HTTP
    - 웹이란 http의 별칭이다
    - web page consists of objects
    - each object is addressable by a URL
        - ex) [www.facebook.com/jungyoujin0527](http://www.facebook.com/jungyoujin0527)
        - <--host name--><--path name-->
- HTTP overview
    - 프로토콜의 이름을 이해하는 것 = 절반 이해!
    - HTTP - hypertext transfer protocol
        - web's application layer protocol
        - 이러한 하이퍼텍스트를 전송하는 프로토콜
        - HTTP request / HTTP response
        - client/server model
            - client - browser that requests, requests, receives, (using http protocol) and displays web object
            - server - web server sends (using http protocol) objects in response to requests
    - uses TCP
        - client initiates TCP connection (creates socket) to server, port 80
        - server accepts TCP connection from client
        - HTTP msgs (application layer protocol msgs) exchanged between browser (HTTP client) and web server (HTTP server)
        - TCP connection closed
    - HTTP is stateless
        - server maintains no info about past client requests
        - 서버는 요청받은 내역을 기억하지 않는다 - 단순성 / 빠름 의 장점
    - aside
        - protocols that maintain state are complex
            - past history(state) must be maintained
            - if server/client crashes, their views of state may be inconsistent, must be reconciled
- HTTP connections
    - non-persistent HTTP
        - at most one object sent over TCP connection
            - connection then closed
        - downloading multiple objects required multiple connections
        - 한번 생성해둔 커넥션 계속 사용
    - persistent HTTP
        - multiple objects can be sent over single TCP connection between c,s
        - 더 효율적이다
    - 보내기 위해 사전에 TCP 커넥션을 생성해둔다
- Non-persistent HTTP
  - ![1-1.png](https://drive.google.com/uc?id=1cSPlcW-trY6AUjIZqVSk-WoN4L_P9owq)
  - ![1-2.png](https://drive.google.com/uc?id=1GHjM19OkYEgDRx0awalLuLAWjvR0xKdt)
- Non-persistent HTTP: response time
  - RTT (routing time)
      - time for a small packet to travel from client to server and back
  - HTTP response time
      - 2RTT + file transmission time
- Sample problem
  - Q) whats end-to-end delay using persistent HTTP?
      - control msg : K bit long
      - base html object : L bit
      - N reference objects, each 1 bit long
      - link bandwidth : R bps
      - propagation delay : d seconds
  - A) non-persistent
      - K/R + d ->
      - K/R + d <- (TCP 커넥션 생성)
      - K/R + d ->
      - L/R + d (베이스 html 파일 받고 파싱) <-
      - L/R + d (request, response N번)
      - …
  - A) persistent
      - NL/R + d ->
      - NL/R + d <-
