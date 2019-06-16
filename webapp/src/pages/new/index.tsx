import { Page } from "components";
import { Layout } from "antd";
import React, { useEffect } from 'react';
import './index.scss';
import { RouteComponentProps } from "react-router";
declare var $: any;
export default function About(props: RouteComponentProps<{}>) {
    const { history } = props;
    let _jumpTo = (path) => () => {
        history.push(path)
    }
    return (
        <Page {...props} selectKey='3'>
            <Layout>
                <div className='markdown-about'>
                    {Txt()}
                </div>
            </Layout>
        </Page>
    )

}

function Txt() {
    return (
        <div className="main margin-20 resource">
            <ul>
                <h1 className="margin-10">
                    网页资源
                </h1>
                <li>
                    https://github.com/denoland/deno &nbsp;&nbsp; <a href="https://github.com/denoland/deno">deno </a>
                </li>

                <li>
                    https://deno.land/ &nbsp;&nbsp; <a href="https://deno.land/">deno 安装</a>
                </li>
                <li>
                    https://deno.land/manual.html &nbsp;&nbsp; <a href="https://deno.land/manual.html">deno 手册</a>

                </li>
                <li>
                    https://deno.land/style_guide.html &nbsp;&nbsp; <a href="https://deno.land/style_guide.html">deno 规范</a>

                </li>
                <li>
                    https://deno.land/typedoc/index.html &nbsp;&nbsp; <a href="https://deno.land/typedoc/index.html">deno 文档</a>
                </li>
                <li>
                    https://github.com/denoland/deno_std &nbsp;&nbsp; <a href="https://github.com/denoland/deno_std">deno 官方包</a>
                </li>
                <li>
                    https://deno.land/x/ &nbsp;&nbsp; <a href="https://deno.land/x/">deno 三方库</a>
                </li>
                <h1 className="margin-10">
                    视频资源
                </h1>
                <li>
                    https://youtu.be/z6JRlx5NC9E &nbsp;&nbsp; <a href="https://deno.land/x/">jsfest talk about deno</a>
                </li>
                <li>
                    http://bit.ly/deno-holyjs-cn &nbsp;&nbsp; <a href="https://deno.land/x/">talk about in st. Petersburg</a>
                </li>
            </ul>
        </div>
    )
}
