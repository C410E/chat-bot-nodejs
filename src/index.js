const venom = require('venom-bot');
const qrcode = require('qrcode-terminal');

const venomConfig = {
    session: 'MinhaSeção',
    autoClose: 60000,
    createPathFileToken: true,
    headless: true,
    qrcode: true
};

const handleMessage = (client, message) => {
    if (message.body === 'oi' || message.body === 'olá') {
        console.log(`Mensagem recebida: ${message.body}`);

        const response = 'Olá, sou um chat bot';

        // Envia a resposta de volta para o mesmo chat
        client.sendText(message.from, response)
            .then(() => console.log('Resposta enviada com sucesso'))
            .catch((error) => console.error('Erro ao enviar resposta:', error));
    }
};

venom
    .create(venomConfig)
    .then((client) => {
        console.log('Cliente inicializado com sucesso');

        client.onMessage((message) => {
            handleMessage(client, message);
        });

        client.getQrCode((qrCode) => {
            console.log('Escaneie o código QR abaixo usando o WhatsApp:');
            qrcode.generate(qrCode, { small: true });
        });

        client.onStateChange((state) => {
            console.log(`Estado atual: ${state}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao criar o cliente Venom-bot:', error);
    });
