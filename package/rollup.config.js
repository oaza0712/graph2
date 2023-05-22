
import { terser } from "rollup-plugin-terser";
import scss from 'rollup-plugin-scss'
import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';


export default {
    input: 'src/js/index.js',
    plugins: [
        terser(),
        scss({
            output: 'dist/@oasis07/data.min.css',
            fileName: 'bundle.css'
        }),
        nodeResolve()
    ],
    output: [
        {
            name: "@oasis07/data",
            file: pkg.browser,
            format: 'umd',
        },
        { 
            file: pkg.module,
            format: 'es' 
        },         
    ]
};
