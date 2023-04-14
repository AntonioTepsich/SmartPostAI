FROM amazonlinux:2

#instala python
RUN yum install -y python37 && \
    yum install -y python3-pip && \
    yum install -y zip && \
    yum clean all

#set pip
RUN python3.7 -m pip install --upgrade pip && \
    python3.7 -m pip install virtualenv
RUN python3.7 -m venv base
RUN source base/bin/activate

#instalo dependencias
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

#zip para deploy
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-1"]