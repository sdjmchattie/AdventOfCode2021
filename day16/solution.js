import { readLines } from '../lib/file-access.js';

class Packet {
  constructor(binary) {
    this._binary = binary;
    this._truncate();
  }
  _binVal(from, to) {
    return parseInt(this._binary.slice(from, to), 2);
  }
  _truncate() {
    if (this.type() === 4) {
      this._binary = this._binary.slice(0, this.body().length * 1.25 + 6);
    } else if (this.lengthType() === 0) {
      this._binary = this._binary.slice(0, this.body().length + 22);
    } else {
      this._binary = this._binary.slice(0, this.body().length + 18);
    }
  }
  version() {
    console.log(this._binVal(0, 3));
    return this._binVal(0, 3);
  }
  type() {
    return this._binVal(3, 6);
  }
  lengthType() {
    if (this.type() === 4) {
      // Type 4 don't have a length type.
      return;
    }

    return this._binVal(6, 7);
  }
  bitCount() {
    if (this.lengthType !== 0) {
      // Only length_type zero have a bit count.
      return;
    }
  }
  length() {
    const _ = this.body(); // Causes the binary to be correct truncated.
    return this._binary.length;
  }
  _extractBitsFromGroups(allBits) {
    var bits = '';
    var stop = false;
    var remainingBits = allBits;

    while (!stop) {
      const nextBits = remainingBits.slice(0, 5);
      bits += nextBits.slice(1);

      if (nextBits[0] === '0') {
        stop = true;
      }

      remainingBits = remainingBits.slice(5);
    }

    return bits;
  }
  body() {
    if (!this._body) {
      if (this.type() === 4) {
        // Read the rest of the packet until the terminator bit is found.
        this._body = this._extractBitsFromGroups(this._binary.slice(6));
      } else {
        this._body = this.innerPackets().reduce(
          (acc, pkt) => acc + pkt._binary,
          ''
        );
      }
    }

    return this._body;
  }
  value() {
    if (this.type() != 4) {
      // Only type 4 packets have a value.
      return;
    }

    return parseInt(this.body(), 2);
  }
  innerPackets() {
    if (!this._innerPackets) {
      this._innerPackets = [];

      if (this.type() !== 4) {
        if (this.lengthType() === 0) {
          var body = this._binary.slice(22, 22 + this._binVal(7, 22));
          while (body.length > 0) {
            const nextPacket = new Packet(body);
            body = body.slice(nextPacket.length());
            this._innerPackets.push(nextPacket);
          }
        } else {
          const packetCount = this._binVal(7, 18);
          var binary = this._binary.slice(18);
          for (var i = 0; i < packetCount; i++) {
            const nextPacket = new Packet(binary);
            binary = binary.slice(nextPacket.length());
            this._innerPackets.push(nextPacket);
          }
        }
      }
    }

    return this._innerPackets;
  }
}

function sumVer(packet) {
  return (
    packet.version() +
    packet.innerPackets().reduce((acc, pkt) => acc + sumVer(pkt), 0)
  );
}

const rawInput = readLines('./day16/input.txt');
const binInput = rawInput[0]
  .split('')
  .reduce(
    (acc, n) => acc + ('0000' + parseInt(n, 16).toString(2)).slice(-4),
    ''
  );

const packet = new Packet(binInput);

console.log(binInput);
console.log(packet.innerPackets());
console.log('Part 1:  ' + sumVer(packet));

console.log('Part 2:  ');
