package pe.gob.vuce.template.authorize.application;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.authorize.application.dto.PerfilDto;
import pe.gob.vuce.template.authorize.domain.entity.Perfil;
import pe.gob.vuce.template.authorize.domain.repository.PerfilRepository;

import java.util.List;

@Service
public class PerfilApplicationService {

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private ModelMapper mapper;

    public PerfilDto create(PerfilDto perfilDto) {
        Perfil perfil = mapper.map(perfilDto, Perfil.class);
        perfil = perfilRepository.save(perfil);
        perfilDto = mapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public PerfilDto get(long perfilId) {
        ModelMapper modelMapper = new ModelMapper();
        Perfil perfil = this.perfilRepository.getById(perfilId);
        PerfilDto perfilDto = perfil == null ? null : modelMapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public PerfilDto getByCode(String codigoPerfil) {
        ModelMapper modelMapper = new ModelMapper();
        Perfil perfil = this.perfilRepository.getByCode(codigoPerfil);
        PerfilDto perfilDto = perfil == null ? null : modelMapper.map(perfil, PerfilDto.class);
        return perfilDto;
    }

    public List<PerfilDto> getByUsuarioId(Long usuarioId) {
        List<Perfil> perfiles = this.perfilRepository.getByUsuarioId(usuarioId);
        List<PerfilDto> perfilesDto = mapper.map(perfiles, new TypeToken<List<PerfilDto>>() {}.getType());
        return perfilesDto;
    }
}
