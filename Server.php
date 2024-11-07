<?php

require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;

class WebSocketServer implements MessageComponentInterface {
    // Array to store all connected clients
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage; // Use SplObjectStorage to handle connections uniquely
    }

    public function onOpen(ConnectionInterface $conn) {
        // Add the new connection to the list of clients
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Received message: $msg\n";
        
        // Broadcast the message to all connected clients
        foreach ($this->clients as $client) {
            if ($from !== $client) { // Don't send the message back to the sender
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove the connection from the list of clients
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Set up the Ratchet App
$app = new App('localhost', 8080, '0.0.0.0');
$app->route('/chat', new WebSocketServer, ['*']);
$app->run();
