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
        <Page {...props}>
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
        <div className="main margin-20">
            <h1 className="margin-10">
                deno简介
          </h1>
            “A secure runtime for JavaScript and TypeScript built with V8, Rust, and Tokio”<br/>
            deno 是node之父致力于实现浏览器标准的、typescript、服务端脚本安全运行环境，预计夏天结束会推出第一个正式版本。<br/>
            <h1 className="margin-10">
                本站简介
          </h1>
            本站提供deno学习交流平台，官方说法预计夏天结束会出现第一个正式版本，提前建站共学者交流,由于版主技术水平和时间有限业余建站还请海涵<br />
            <h1 className="margin-10">
                建站细节
          </h1>
            font: react + reduct + typescript + ... <br />
            server: deno + deno-postgresql + ...<br />
            deploy: travisci <br />
            machine: 1核1G1M(略惨,要支持吗?)<br />
            <h1 className="margin-10">
                共建入口
          </h1>
            您想参与网站建设请提交pr至---><a href="https://github.com/runnerSnail/denoer">项目地址</a><br />

            <h1 className="margin-20">QQ交流群: 698469316</h1>

        </div>
    )
}
