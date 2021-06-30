import Typography from '@material-ui/core/Typography'

const Page500 = () => {
  document.title = 'Internal server error'
  const message = '500 Internal server error...\nPlease try again later...'
  return (
    <Typography variant="h4" align='center'
      style={{ paddingTop: '3rem', whiteSpace: 'pre-wrap' }}
    >
      {message}
    </Typography>
  );
};

export default Page500;
