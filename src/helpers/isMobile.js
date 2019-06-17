export const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      global.navigator.userAgent
    )
  ) {
    return true;
  }
  return false;
};

export default isMobile;
