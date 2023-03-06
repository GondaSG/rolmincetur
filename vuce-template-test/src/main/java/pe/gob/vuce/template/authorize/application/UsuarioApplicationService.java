package pe.gob.vuce.template.authorize.application;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.gob.vuce.template.authorize.application.dto.PerfilDto;
import pe.gob.vuce.template.authorize.application.dto.UserAuthDto;
import pe.gob.vuce.template.authorize.application.dto.UsuarioDto;
import pe.gob.vuce.template.authorize.domain.entity.Usuario;
import pe.gob.vuce.template.authorize.domain.repository.UsuarioRepository;
import pe.gob.vuce.template.common.infrastructure.security.JwtTokenProvider;

import java.util.List;
import java.util.UUID;

@Service
public class UsuarioApplicationService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PerfilApplicationService perfilApplicationService;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public UsuarioDto create(UsuarioDto usuarioDto) {
        Usuario usuario = mapper.map(usuarioDto, Usuario.class);
        usuario = usuarioRepository.save(usuario);
        usuarioDto = mapper.map(usuario, UsuarioDto.class);
        return usuarioDto;
    }

    public UsuarioDto update(UsuarioDto usuarioDto) {
        Usuario usuario = mapper.map(usuarioDto, Usuario.class);
        usuario = usuarioRepository.update(usuario);
        usuarioDto = mapper.map(usuario, UsuarioDto.class);
        return usuarioDto;
    }

    public UserAuthDto validateUser(UserAuthDto usuarioAuthDto) throws Exception {
        usuarioAuthDto = this.buildUserAuthDto(usuarioAuthDto);
        return usuarioAuthDto;
    }

    private UserAuthDto buildUserAuthDto(UserAuthDto usuarioAuthDto) throws Exception {
        usuarioAuthDto.setId(usuarioAuthDto.getUser().getId());
        usuarioAuthDto.setName(usuarioAuthDto.getUser().getUsuario());
        usuarioAuthDto.setAuthenticated(true);
        usuarioAuthDto.setBearerToken(new UUID(0L, 0L).toString());
        usuarioAuthDto.setBearerToken(jwtTokenProvider.buildJwtToken(usuarioAuthDto));
        return usuarioAuthDto;
    }

    public UsuarioDto getById(long usuarioId) {
        Usuario usuario = this.usuarioRepository.getById(usuarioId);
        UsuarioDto usuarioDto = null;
        if (usuario != null) {
            usuarioDto = mapper.map(usuario, UsuarioDto.class);
            List<PerfilDto> profilesDto = this.perfilApplicationService.getByUsuarioId(usuarioDto.getId());

            for (PerfilDto perfil : profilesDto) {
                usuarioDto.addPerfil(perfil);
            }
        }
        return usuarioDto;
    }

    public UsuarioDto getByNameAndSOL(String nombreUsuario, String usuarioSol) {
        Usuario usuario = this.usuarioRepository.getByNameAndSOL(nombreUsuario, usuarioSol);
        UsuarioDto usuarioDto = usuario == null ? null : mapper.map(usuario, UsuarioDto.class);
        usuarioDto.addPerfiles(this.perfilApplicationService.getByUsuarioId(usuario.getId()));
        return usuarioDto;
    }
}
