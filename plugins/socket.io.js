import io from 'socket.io-client';
import pkg from '~/package';

const socket = io.connect(`wss://${pkg.backend}/`);

export default socket;
