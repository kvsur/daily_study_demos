### 一、webpack 构建流程分析

**1. webpack 构建过程**
1. 根据配置识别文件入口；
2. 逐层识别模块依赖（包括CommonJs、AMD、ES6 的 import 都会被识别和分析）；
3. 最后输出打包后的代码；

**2. webpack 构建原理**
1. 初始化参数；

解析webpack 配置参数，合并shell传入和webpack.config.js  文件配置的参数，merge 为最后的配置对象；

2. 开始编译；

根据上一步得到的配置对象初始化compiler 对象，注册所有的已配置的插件，没有插件监听webpack生命周期对应的事件节点，完成相应的文件操作，然后compiler对象的run方法开始执行编译；

3. 确定入口文件；

从第一步得到的配置对象中获取entry 入口文件，开始解析文件构建AST语法数，并且需要找文件的依赖进行相同的操作，如此递归下去直至递归完成；

4. 编译模块；

递归的过程中根据文件类型和loader配置，调用所有配置的loader文件进行转换，再找出该模块依赖的模块，直至递归完成；

5. 完成编译并输出；

递归完成之后，得到每个文件的结果，包含每个模块以及他们之间的依赖关系，根据entry配置生成代码块chunk；

6. 完成输出；

最后输出所有的chunk到文件系统；


> 本项目将简单的实现以上核心流程；


