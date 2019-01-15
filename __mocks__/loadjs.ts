let path = ''

const loadjs = (paths: string, arg1: string) => {
  path = paths
}

const ready = (deps: string, args: {success: Function; error: Function}) => {
  setTimeout(() => {
    if (path.split('=')[1] === '') args.error()
    else args.success()
  }, 200)
}

loadjs.ready = ready

export default loadjs
