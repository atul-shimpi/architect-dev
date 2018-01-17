<h1 style="text-align: center">Processing...</h1>

<script>
    var token = "{!! $token !!}";
    var data   = null;

    @if(isset($data) && $data)
        @if(json_decode($data))
            data = {!! $data !!};
        @else
            data = '{!! $data !!}';
        @endif
    @endif

    window.opener.postMessage({token: token, callbackData: data}, '*');
    window.close();
</script>