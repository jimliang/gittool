
GIT工具封装

## 使用

```
const git = new Git(__dirname)

await git.init()

await git.listChangeFiles('324ae86') // [ '.gitignore', 'index.js' ]

await git.status() // { modifieds: [ 'README.md' ], untrackeds: [ 'a.js', 'b.js' ] }
```