/*globals $*/
$.when($.ajax({
  url: '/dwg4tgt4/',
  headers: {
    'Accept': 'application/json'
  }
})).then(ctx => console.log(ctx));