<?php
    $conn = fsockopen("carbon.hostedgraphite.com", 2003);
    fwrite($conn, "8770573a-2e24-4ad5-9d1f-f69afca83321.test.php.tcp_socket 1.2\n");
    fclose($conn);

    $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
    $message = "8770573a-2e24-4ad5-9d1f-f69afca83321.test.php.udp_socket 2.2\n";
    socket_sendto($sock, $message, strlen($message), 0, "carbon.hostedgraphite.com", 2003);

    print 'metrics sent'
?>
