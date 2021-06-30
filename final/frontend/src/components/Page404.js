import Typography from '@material-ui/core/Typography'

const Page404 = () => {
  document.title = '404 Page not found'
  return (<>
    <Typography variant="h4" style={{ paddingTop: '3rem' }}>
      404 Page not found. QQ
    </Typography>
  </>);
};

export default Page404;
