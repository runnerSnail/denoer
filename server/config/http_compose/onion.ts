//@ts-ignore
import { serve, ServerRequest } from '../../dependcy/dep.ts';
import { compose } from './compose.ts';
const exit = Deno.exit;
export default class Onion {
  private _middlewares: Function[];

  constructor() {
    this._middlewares = [];
  }

  /**
   * 注册使用中间件
   * @param fn {Function}
   */
  public use(fn: Function): void {
    this._middlewares.push(fn);
  }

  /**
   * 开始监听服务
   * @param addr {string} 监听地址和端口 0.0.0.0:0000
   * @param fn {Function} 监听执行后的回调
   */
  public listen(addr: string, fn?: Function) {
    this.createServer(addr);
    // 启动HTTP服务
    if (fn && typeof fn === 'function') {
      fn();
    }
  }
  /**
   * createServer
   */
  public async createServer(addr: string) {
    const server = serve(addr);
    
    for await (const req of server) {
      try {
        // 等待执行所有中间件
        const fn = compose(this._middlewares);
        fn(req).then().catch((e) => {
          this._onError(e, req)
        });
      } catch (error) {
        this._onError(error, req);
      }

    }
  }
  /**
   * 统一错误处理
   * @param err {Error} 错误对象
   * @param ctx {SafeContext} 当前HTTP上下文
   */
  private async _onError(err: Error, req: ServerRequest) {
    if (req instanceof ServerRequest) {
      req.respond({ body: new TextEncoder().encode(err.stack), status: 500 });
    } else {
      exit(1);
    }
  }
}