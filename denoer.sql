--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: article; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.article (
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title character varying(40),
    content text,
    article_id integer NOT NULL,
    read_num integer DEFAULT 0,
    support_num integer DEFAULT 0,
    type integer,
    gitlab_id character varying(20)
);


ALTER TABLE public.article OWNER TO denoer;

--
-- Name: article_article_id_seq; Type: SEQUENCE; Schema: public; Owner: denoer
--

CREATE SEQUENCE public.article_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.article_article_id_seq OWNER TO denoer;

--
-- Name: article_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: denoer
--

ALTER SEQUENCE public.article_article_id_seq OWNED BY public.article.article_id;


--
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: denoer
--

CREATE SEQUENCE public.comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_comment_id_seq OWNER TO denoer;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.comment (
    comment_id integer DEFAULT nextval('public.comment_comment_id_seq'::regclass) NOT NULL,
    content text,
    gitlab_id character varying(20),
    article_id integer,
    parent_id integer,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    support_num integer DEFAULT 0
);


ALTER TABLE public.comment OWNER TO denoer;

--
-- Name: resource_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: denoer
--

CREATE SEQUENCE public.resource_resource_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resource_resource_id_seq OWNER TO denoer;

--
-- Name: resource; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.resource (
    resource_id integer DEFAULT nextval('public.resource_resource_id_seq'::regclass) NOT NULL,
    href character varying(200),
    title character varying(200),
    description character varying(400)
);


ALTER TABLE public.resource OWNER TO denoer;

--
-- Name: TABLE resource; Type: COMMENT; Schema: public; Owner: denoer
--

COMMENT ON TABLE public.resource IS '优秀资源或者开源代码';


--
-- Name: COLUMN resource.href; Type: COMMENT; Schema: public; Owner: denoer
--

COMMENT ON COLUMN public.resource.href IS '资源链接';


--
-- Name: COLUMN resource.title; Type: COMMENT; Schema: public; Owner: denoer
--

COMMENT ON COLUMN public.resource.title IS '资源标题';


--
-- Name: COLUMN resource.description; Type: COMMENT; Schema: public; Owner: denoer
--

COMMENT ON COLUMN public.resource.description IS '资源简单介绍';


--
-- Name: support_support_id_seq; Type: SEQUENCE; Schema: public; Owner: denoer
--

CREATE SEQUENCE public.support_support_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.support_support_id_seq OWNER TO denoer;

--
-- Name: support_article; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.support_article (
    support_article_id integer DEFAULT nextval('public.support_support_id_seq'::regclass) NOT NULL,
    article_id integer,
    gitlab_id character varying(20)
);


ALTER TABLE public.support_article OWNER TO denoer;

--
-- Name: support_comment; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.support_comment (
    support_id integer DEFAULT nextval('public.support_support_id_seq'::regclass) NOT NULL,
    comment_id integer,
    gitlab_id character varying(20)
);


ALTER TABLE public.support_comment OWNER TO denoer;

--
-- Name: useres; Type: TABLE; Schema: public; Owner: denoer
--

CREATE TABLE public.useres (
    user_id integer NOT NULL,
    user_name character varying(200) DEFAULT NULL::character varying,
    user_img character varying(200) DEFAULT NULL::character varying,
    gitlab_id character varying(20),
    add_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    gitlab_url character varying(100),
    company character varying(100),
    location character varying(100),
    email character varying(100),
    followers character varying(100)
);


ALTER TABLE public.useres OWNER TO denoer;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: denoer
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO denoer;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: denoer
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public.useres.user_id;


--
-- Name: article article_id; Type: DEFAULT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.article ALTER COLUMN article_id SET DEFAULT nextval('public.article_article_id_seq'::regclass);


--
-- Name: useres user_id; Type: DEFAULT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.useres ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.article (create_time, title, content, article_id, read_num, support_num, type, gitlab_id) FROM stdin;
2019-05-22 19:56:18.280071	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	23	1	1	1	2312121
2019-05-22 19:56:18.280071	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	24	1	1	1	2312121
2019-05-22 19:56:18.280071	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	25	1	1	1	2312121
2019-05-22 19:56:18.280071	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	26	1	1	1	2312121
2019-05-23 10:27:38.861509	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	22	1	2	1	2312121
2019-05-22 19:56:18.280071	这是一个测试的文章	你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好	21	63	0	1	40654631
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.comment (comment_id, content, gitlab_id, article_id, parent_id, create_time, support_num) FROM stdin;
4	qqq	undefined	21	0	2019-06-02 15:34:35.411459	0
5	qqq	40654631	21	0	2019-06-02 15:35:35.011211	0
6	qqq	40654631	21	0	2019-06-02 15:35:44.417688	0
7	qqq	40654631	21	0	2019-06-02 15:39:37.628052	0
8	qqq	40654631	21	0	2019-06-02 15:40:23.785876	0
9	qqq	40654631	21	0	2019-06-02 15:40:23.799376	0
10	qqq	40654631	21	0	2019-06-02 15:41:48.37374	0
11	qqq	40654631	21	0	2019-06-02 15:41:48.382586	0
12	qqq	40654631	21	0	2019-06-02 15:42:47.589441	0
13	qqq	40654631	21	0	2019-06-02 15:42:47.595587	0
14	qqq	40654631	21	0	2019-06-02 15:44:09.54768	0
15	qqq	40654631	21	0	2019-06-02 15:44:09.559344	0
16	qqq	40654631	21	0	2019-06-02 15:46:41.431002	0
17	qqq	40654631	21	0	2019-06-02 15:46:41.44606	0
18	qqq	40654631	21	0	2019-06-02 15:47:13.551923	0
19	qqq	40654631	21	0	2019-06-02 15:47:13.557434	0
20	qqq	40654631	21	0	2019-06-02 15:51:46.043807	0
21	qqq	40654631	21	0	2019-06-02 15:51:46.050389	0
22	qqq	40654631	21	0	2019-06-02 15:53:31.558944	0
23	qqq	40654631	21	0	2019-06-02 15:53:31.575762	0
24	qqq	40654631	21	0	2019-06-02 15:53:51.343028	0
25	qqq	40654631	21	0	2019-06-02 15:53:51.34851	0
1	1	40654631	21	0	2019-05-28 15:33:16.547611	0
2	1	40654631	21	0	2019-05-27 15:33:16.547611	0
3	1	40654631	22	0	2019-05-27 15:33:16.547611	0
\.


--
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.resource (resource_id, href, title, description) FROM stdin;
\.


--
-- Data for Name: support_article; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.support_article (support_article_id, article_id, gitlab_id) FROM stdin;
1	1	2
\.


--
-- Data for Name: support_comment; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.support_comment (support_id, comment_id, gitlab_id) FROM stdin;
\.


--
-- Data for Name: useres; Type: TABLE DATA; Schema: public; Owner: denoer
--

COPY public.useres (user_id, user_name, user_img, gitlab_id, add_time, gitlab_url, company, location, email, followers) FROM stdin;
26	runnerSnail	https://avatars1.githubusercontent.com/u/40654631?v=4	40654631	2019-05-24 14:28:50.793944	https://github.com/runnerSnail	Netease	hangzhou	null	1
27	runnerSnail	https://avatars1.githubusercontent.com/u/40654631?v=4	123456	2019-05-24 14:28:50.793944	https://github.com/runnerSnail	Netease	hangzhou	null	1
\.


--
-- Name: article_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: denoer
--

SELECT pg_catalog.setval('public.article_article_id_seq', 26, true);


--
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: denoer
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 25, true);


--
-- Name: resource_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: denoer
--

SELECT pg_catalog.setval('public.resource_resource_id_seq', 1, false);


--
-- Name: support_support_id_seq; Type: SEQUENCE SET; Schema: public; Owner: denoer
--

SELECT pg_catalog.setval('public.support_support_id_seq', 13, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: denoer
--

SELECT pg_catalog.setval('public.user_user_id_seq', 27, true);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (resource_id);


--
-- Name: support_comment support_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.support_comment
    ADD CONSTRAINT support_comment_pkey PRIMARY KEY (support_id);


--
-- Name: support_article support_pkey; Type: CONSTRAINT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.support_article
    ADD CONSTRAINT support_pkey PRIMARY KEY (support_article_id);


--
-- Name: useres user_pkey; Type: CONSTRAINT; Schema: public; Owner: denoer
--

ALTER TABLE ONLY public.useres
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

