function useFile(url = null, fileType = 0) {
  // eslint-disable-next-line prefer-const
  let file = {
    name: "",
    extension: "",
    fileType,
    // id: null,
    fileStatus: 0,
    readUrl: url,
    // bytes: null,
    url: url,
    base64: "",
  };
  return file;
}

export default useFile;
