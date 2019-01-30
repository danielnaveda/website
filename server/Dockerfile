
FROM golang

# if left blank app will run with dev settings
# to build production image run:
# $ docker build ./server --build-args app_env=production
ARG app_env
ENV APP_ENV $app_env

# it is okay to leave user/GoDoRP as long as you do not want to share code with other libraries
COPY ./ /go/src/github.com/user/geomess/server
WORKDIR /go/src/github.com/user/geomess/server

# added vendor services will need to be included here
#RUN go get ./vendor/database

RUN go get ./
RUN go build

CMD ["go", "run", "main.go"]

# if dev setting will use pilu/fresh for code reloading via docker-compose volume sharing with local machine
# if production setting will build binary
CMD if [ ${APP_ENV} = production ]; \
	then \
	server; \
	else \
	go get github.com/pilu/fresh && \
	fresh; \
	fi
