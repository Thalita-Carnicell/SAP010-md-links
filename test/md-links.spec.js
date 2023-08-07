const {lerArquivos, lerDiretorioMd, validateLinks, mdLinks, getStats} = require('../src/index');
const path = require('path');
const fs = require('fs');

describe('lerArquivos', () => {
  it ('deve retornar um array vazio quando o arquivo não tem links',() => {
    return lerArquivos('./src/arquivos/vazio.md').then((result)=> {
      expect(result).toEqual([]);
    });
  });
});

it ('deve retornar um array com informações quando o arquivo tiver links',() => {
  const filePath = path.resolve(__dirname, '../src/arquivos/arquivo.md');
  return lerArquivos(filePath).then((result)=> {
    expect(result).toEqual([
      {
        text: 'Google',
        url: 'https://www.google.com',
        file: filePath,
      },
      {
        text: 'GitHub',
        url: 'https://github.com/',
        file: filePath,
      },
      {
        text: 'GitHub',
        url: 'https://github.com/',
        file: filePath,
      },
      {
        text: 'Figma',
        url: 'https://ww.figma.com/',
        file: filePath,
      },
     
     ]);
  });
});

// teste de validar

describe('validateLinks', () => {
  it('deve validar links corretamente', (done) => {
    const mockArrayLinks = [
      { url: 'http://example.com', text: 'Exemplo 1' },
      { url: 'http://invalid-url', text: 'Link Inválido' }
    ];

    const mockResponseSuccess = {
      status: 200,
      ok: true
    };

    const mockResponseFail = {
      status: 404,
      ok: false
    };

    // Mock do fetch para retornar a resposta desejada
    const fetchMock = jest.fn((url) => {
      if (url === 'http://example.com') {
        return Promise.resolve(mockResponseSuccess);
      } else {
        return Promise.reject(mockResponseFail);
      }
    });

    global.fetch = fetchMock;

    validateLinks(mockArrayLinks).then((result) => {
      expect(result).toEqual([
        { url: 'http://example.com', text: 'Exemplo 1', status: 200, ok: 'ok' },
        { url: 'http://invalid-url', text: 'Link Inválido', status: 404, ok: 'fail' }
      ]);
      done();
    }).catch(done.fail);
  });
});

//Teste getStats

describe('getStats', () => {
  it('Mostrar total de links e links únicos quando der o --stats', () => {
    const mockArrayLinks = [
      { url: 'https://www.google.com' },
      { url: 'https://github.com/' },
      { url: 'https://github.com/' },
      { url: 'https://ww.figma.com/' },
    ];

    const options = {
      validate: false,
      stats: true,
    };

    const result = {
      totalLinks: 4,
      uniqueLinks: 3,
    };

    const res = getStats(mockArrayLinks, options);
    expect(res).toEqual(result);
  });
});

