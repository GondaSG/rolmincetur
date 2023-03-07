package pe.gob.vuce.template.authorize.application;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.authorize.application.dto.PerfilDto;
import pe.gob.vuce.template.authorize.domain.entity.Perfil;

import java.util.List;

@Service
public class PerfilApplicationService {


    @Autowired
    private ModelMapper mapper;

    public PerfilDto create(PerfilDto perfilDto) {
        Perfil perfil = mapper.map(perfilDto, Perfil.class);
        perfil = null;//perfilRepository.save(perfil);
        perfilDto = mapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public PerfilDto get(long perfilId) {
        ModelMapper modelMapper = new ModelMapper();
        Perfil perfil = null;//this.perfilRepository.getOne(perfilId);
        PerfilDto perfilDto = perfil == null ? null : modelMapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public PerfilDto getByCode(String codigoPerfil) {
        ModelMapper modelMapper = new ModelMapper();
        Perfil perfil = null ;//this.perfilRepository.getByCode(codigoPerfil);
        PerfilDto perfilDto = perfil == null ? null : modelMapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public List<PerfilDto> getByUsuarioId(Long usuarioId) {
        List<Perfil> perfiles = null ;//this.perfilRepository.getByUsuarioId(usuarioId);
        List<PerfilDto> perfilesDto = mapper.map(perfiles, new TypeToken<List<PerfilDto>>() {}.getType());
        return perfilesDto;
    }
}
