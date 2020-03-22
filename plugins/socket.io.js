import io from 'socket.io-client';
import pkg from '~/package';

const socket = io.connect(`wss://${pkg.backend}/`, { secure: true, rejectUnauthorized: false });

export default socket;
