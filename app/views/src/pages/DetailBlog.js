const DetailBlog = ({ match }) => {
  const { id } = match.params;
  return (
    <div>
      <h1>Detail blog {id}</h1>
    </div>
  );
};

export default DetailBlog;
