<% options.api.forEach((componentKey) => { %>
  import <%=componentKey%> from '<%=options.pkg.name%>/api/<%=componentKey%>';
<% })%>

export default function (ctx, inject) {
  const api = {
    <% options.api.forEach((componentKey) => { %>
      <%=componentKey%>: <%=componentKey%>(ctx.$axios),
    <% })%>
  };
  ctx.$api = api;
  inject('api', api);
}

